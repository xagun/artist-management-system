<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class ArtistService
{

    /**
     * get list of all the artists
     *
     * @return array
     */
    public function getAllArtists(): array
    {
        // return (array) DB::select("select * from artists");
        $artists = DB::select("SELECT * FROM artists");

        // Process each artist to include the full image URL
        $artists = array_map(function ($artist) {
            $artist = (array) $artist; // Convert stdClass object to array
            if (!empty($artist['image'])) {
                $artist['image'] = asset('storage/' . $artist['image']);
            }
            return $artist;
        }, $artists);

        return $artists;
    }

    /**
     * Store artist data
     *
     * @param array $artist
     *
     * @return bool
     */
    public function store(array $artist): bool
    {
        $insertData = [
            'name' => $artist['name'],
            'dob' => $artist['dob'],
            'gender' => $artist['gender'],
            'address' => $artist['address'],
            'first_release_year' => $artist['first_release_year'],
            'no_of_albums_released' => $artist['no_of_albums_released'],
            'created_at' => now(),
            'updated_at' => now()
        ];

        // Check if image is provided in the $artist array
        if (isset($artist['image'])) {
            $insertData['image'] = $artist['image'];
        }

        return DB::table('artists')->insert($insertData);
    }

    /**
     * Update artist table.
     *
     * @param array $artist
     * @param int $id
     *
     * @return bool
     */
    public function update(array $artist, int $id): bool
    {
        $updateData = [
            'name' => $artist['name'],
            'dob' => $artist['dob'],
            'gender' => $artist['gender'],
            'address' => $artist['address'],
            'first_release_year' => $artist['first_release_year'],
            'no_of_albums_released' => $artist['no_of_albums_released'],
            'updated_at' => now()
        ];

        // Check if image is provided in the update data
        if (isset($artist['image'])) {
            $updateData['image'] = $artist['image'];
        }

        return DB::table('artists')
            ->where('id', $id)
            ->update($updateData);
    }


    /**
     * Delete the data from artist table.
     *
     * @param int $artistId
     *
     * @return bool
     */
    public function delete(int $artistId): bool
    {
        return DB::delete(
            'DELETE FROM artists where id=?',
            [
                $artistId
            ]
        );
    }



    /**
     * Find artist by ID
     * @param int $id
     *
     * @return array|null
     */
    public function getArtistById(int $id): array
    {
        $artist = DB::select('SELECT * FROM artists where id=? LIMIT 1', [$id]);

        return !empty($artist) ? (array) $artist[0] : [];
    }
}
