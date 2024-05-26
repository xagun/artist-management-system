<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArtistRequest;
use App\Services\ArtistService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ArtistController extends Controller
{
    /**
     * @var ArtistService
     */
    protected ArtistService $artistService;

    /**
     * @param ArtistService $artistService
     */
    public function __construct(ArtistService $artistService)
    {
        $this->artistService = $artistService;
    }
    /**
     * All artist data
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $artistList = $this->artistService->getAllArtists();

        return response()->json([
            'success' => true,
            'data' => $artistList
        ], 200);
    }

    /**
     * Store artist record.
     *
     * @param ArtistRequest $request
     *
     * @return JsonResponse
     */
    public function store(ArtistRequest $request): JsonResponse
    {
        $validatedData = $request->validated();

        try {
            DB::beginTransaction();
            $this->artistService->store($validatedData);

            DB::commit();
        } catch (\Exception $exception) {
            logger($exception);

            return response()->json([
                'success' => false,
                'message' => "Something went wrong"
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Artist record created successfully'
        ], 200);
    }

    /**
     * Update the artist table data.
     *
     * @param ArtistRequest $request
     * @param int $artistId
     *
     * @return JsonResponse
     */
    public function update(ArtistRequest $request, $artistId): JsonResponse
    {
        $validatedData = $request->validated();

        try {
            DB::beginTransaction();
            $artist = $this->artistService->getArtistById($artistId);

            if (empty($artist)) {
                throw new NotFoundHttpException('The requested resource doesnot exists.');
            }

            $this->artistService->update($validatedData, $artistId);

            DB::commit();
        } catch (NotFoundHttpException $exception) {
            return response()->json([
                'success' => false,
                'message' => "Something went wrong"

            ], 404);
        } catch (\Exception $exception) {
            logger($exception);

            return response()->json([
                'success' => false,
                'message' => "Something went wrong."
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Artist record updated successfully'
        ], 200);
    }



    /**
     * Delete the artist data.
     *
     * @param mixed $artistId
     *
     * @return JsonResponse
     */
    public function destroy($artistId): JsonResponse
    {
        try {
            DB::beginTransaction();
            $artist = $this->artistService->getArtistById($artistId);

            if (empty($artist)) {
                throw new NotFoundHttpException('The requested resource doesnot exists.');
            }

            $this->artistService->delete($artistId);

            DB::commit();
        } catch (NotFoundHttpException $exception) {
            return response()->json([
                'success' => false,
                'message' => "Something went wrong"

            ], 404);
        } catch (\Exception $exception) {
            logger($exception);

            return response()->json([
                'success' => false,
                'message' => "Something went wrong."
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Artist Record deleted successfully'
        ], 200);
    }
}
