<?php

namespace App\Http\Controllers;

use App\Http\Requests\MusicRequest;
use App\Services\MusicService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MusicController extends Controller
{
    /**
     * @var MusicService
     */
    protected MusicService $musicService;

    /**
     * @param MusicService $musicService
     */
    public function __construct(MusicService $musicService)
    {
        $this->musicService = $musicService;
    }


    public function index()
    {
        $musicList = $this->musicService->getAllMusic();

        return response()->json([
            'success' => true,
            'data' => $musicList
        ], 200);
    }


    /**
     * Store Music data.
     *
     * @param MusicRequest $request
     *
     * @return JsonResponse
     */
    public function store(MusicRequest $request): JsonResponse
    {
        $validatedData = $request->validated();

        try {
            DB::beginTransaction();
            $this->musicService->store($validatedData);
            DB::commit();

            return response()->json([
                'success' => true,
                'message' => "Music stored successfully."
            ]);
        } catch (\Exception $e) {
            logger($e);

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get Musics data for edit.
     *
     * @param mixed $musicId
     *
     * @return JsonResponse
     */
    public function getMusicById($musicId): JsonResponse
    {
        $music = $this->musicService->getMusicById($musicId);

        if (empty($music)) {
            return response()->json([
                'success' => false,
                'message' => "The request resource is not available."
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => "Music data fetched successfully.",
            'data' => $music
        ], 200);
    }

    public function getMusicByArtist($artistId): JsonResponse
    {
        $music = $this->musicService->getMusicByArtist($artistId);
        // if (empty($music)) {
        //     return response()->json([
        //         'success' => false,
        //         'message' => "The request resource is not available."
        //     ], 404);
        // }

        return response()->json([
            'success' => true,
            'message' => "Music data fetched successfully.",
            'data' => $music
        ], 200);
    }
    /**
     * Update Music data.
     *
     * @param MusicRequest $request
     *
     * @return JsonResponse
     */
    public function update(MusicRequest $request, $musicId): JsonResponse
    {
        $validatedData = $request->validated();

        try {
            DB::beginTransaction();
            $this->musicService->update($validatedData, $musicId);
            DB::commit();

            return response()->json([
                'success' => true,
                'message' => "Music updated successfully."
            ], 200);
        } catch (\Exception $e) {
            logger($e);

            return response()->json([
                'success' => false,
                'message' => "Something went wrong."
            ], 500);
        }
    }

    /**
     * Delete music data.
     *
     * @param mixed $musicId
     *
     * @return JsonResponse
     */
    public function destroy($musicId): JsonResponse
    {
        try {
            $music = $this->musicService->getMusicById($musicId);

            if (empty($music)) {
                return response()->json([
                    'success' => false,
                    'message' => "The request resource is not available."
                ], 404);
            }

            DB::beginTransaction();
            $this->musicService->delete($musicId);
            DB::commit();

            return response()->json([
                'success' => true,
                'message' => "Music deleted successfully."
            ], 200);
        } catch (\Exception $e) {
            logger($e);

            return response()->json([
                'success' => false,
                'message' => "Something went wrong."
            ], 500);
        }
    }
}
