<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UserController extends Controller
{
    /**
     * @var UserService
     */
    protected UserService $userService;

    /**
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    /**
     * user registration
     *
     * @param UserRegistrationRequest $request
     *
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $validatedData = $request->validated();

        try {
            DB::beginTransaction();
            $this->userService->registerUser($validatedData);
            DB::commit();
        } catch (\Exception $exception) {
            logger($exception);

            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()
            ], 500);
        }
        return response()->json([
            'success' => true,
            'message' => 'User registration successful.'
        ], 200);
    }


    /**
     * login
     *
     * @param LoginRequest $request
     *
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $validatedData = $request->validated();

        try {
            $user = $this->userService->getUserByEmail($validatedData['email']);

            //Check if the user exist in the system or not
            if (empty($user)) {
                return response()->json([
                    'success' => false,
                    'message' => "The email is not associated with any user."
                ], 400);
            }

            //Check wheather the password provided by user matches with the system pasword
            if (!Hash::check($validatedData['password'], $user['password'])) {
                return response()->json([
                    'success' => false,
                    'message' => "The password provided is incorrect."
                ], 400);
            }

            $user = User::find($user['id']);
            $token = $user->createToken("Login API Token")->plainTextToken;

            $responseData['user_details'] = $user;
            $responseData['access_token'] = $token;
        } catch (\Exception $exception) {
            logger($exception);

            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'User login successfull.',
            'data'    => $responseData

        ], 200);
    }

    /**
     * logout
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        try {
            $user = Auth::user();
            $user->currentAccessToken()->delete();
        } catch (\Exception $exception) {
            logger($exception);
            return response()->json([
                'success' => false,
                'message' => "Something went wrong."
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => "You have been successfully logged out."
        ], 200);
    }



    /**
     * Get all users data
     *
     * @return JsonResponse
     */
    public function getAllUser(): JsonResponse
    {
        $authUserId = Auth::id();
        $allUsers = $this->userService->getAllUser();

        $allUsers = array_filter($allUsers, function ($user) use ($authUserId) {
            return $user->id !== $authUserId;
        });

        return response()->json([
            'success' => true,
            'data' => $allUsers
        ], 200);
    }


    /**
     * Delete user
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function deleteUser(Request $request): JsonResponse
    {
        try {
            $user = $this->userService->getUserByEmail($request['email']);

            if (empty($user)) {
                return response()->json([
                    'success' => false,
                    'message' => "This user does not exist."
                ], 404);
            }

            DB::beginTransaction();
            $this->userService->delete($request['email']);
            DB::commit();

            return response()->json([
                'success' => true,
                'message' => "User deleted successfully."
            ], 200);
        } catch (\Exception $e) {
            logger($e);

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }


    public function updateUser(UserUpdateRequest $request, $userId): JsonResponse
    {
        $validatedData = $request->validated();
        try {
            DB::beginTransaction();
            $user = $this->userService->getUserById($userId);

            if (empty($user)) {
                throw new NotFoundHttpException('The requested user doesnot exists.');
            }

            $this->userService->update($validatedData, $userId);

            DB::commit();
        } catch (NotFoundHttpException $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()

            ], 404);
        } catch (\Exception $exception) {
            logger($exception);

            return response()->json([
                'success' => false,
                'message' =>  $exception->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'User records updated successfully'
        ], 200);
    }
}
