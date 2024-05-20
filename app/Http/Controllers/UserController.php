<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
     * Store the user registration data.
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
}
