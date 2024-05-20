<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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
        }
        catch (\Exception $exception) {
            logger($exception);

            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()
            ], 500);
        }
        return response()->json([
            'success' => 'true',
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
    public function login(LoginRequest $request):JsonResponse {
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
            'success' => 'true',
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

}
