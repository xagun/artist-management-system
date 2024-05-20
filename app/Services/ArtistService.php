<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class ArtistService {

    /**
     * get list of all the artists
     *
     * @return array
     */
    public function getAllArtists():array
    {
        return (array) DB::select("select * from artists");
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
        return DB::insert(
            'INSERT INTO artists (name, dob, gender, address, first_release_year, no_of_albums_released, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?)',
            [
                $artist['name'],
                $artist['dob'],
                $artist['gender'],
                $artist['address'],
                $artist['first_release_year'],
                $artist['no_of_albums_released'],
                now(),
                now()
            ]
        );
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
        return DB::update(
            'UPDATE artists SET name=?, dob=?, gender=?, address=?, first_release_year=?, no_of_albums_released=?, updated_at=? WHERE id=?',
            [
                $artist['name'],
                $artist['dob'],
                $artist['gender'],
                $artist['address'],
                $artist['first_release_year'],
                $artist['no_of_albums_released'],
                now(),
                $id
            ]
        );
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
    public function getArtistById(int $id):array
    {
        $artist = DB::select('SELECT * FROM artists where id=? LIMIT 1', [$id]);

        return !empty($artist) ? (array) $artist[0] : [];
    }
}
