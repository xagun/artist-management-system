<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class MusicService
{
    /**
     * get all music list
     *
     * @return array
     */
    public function getAllMusic(): array{

        $allMusic = DB::select("SELECT music.*, artists.name AS artist_name
        FROM music
        LEFT JOIN artists ON music.artist_id = artists.id");
        return (array) $allMusic;
    }

    /**
     * Get list of music by id.
     *
     * @param mixed $musicId
     *
     * @return array|null
     */
    public function getMusicById($musicId): ?array
    {
        $musicList = DB::select("SELECT * FROM music WHERE id= $musicId LIMIT 1");

        return !empty($musicList) ? (array) $musicList[0] : null;
    }
    /**
     * Get Music by Id.
     *
     * @param int $artistId
     *
     * @return array
     */
    public function getMusicByArtist(int $artistId): array
    {
        $musicByArtist = DB::select("SELECT music.*, artists.name AS artist_name
        FROM music
        LEFT JOIN artists ON music.artist_id = artists.id WHERE artist_id = $artistId");

        return $musicByArtist;
    }

    /**
     * Store music data.
     *
     * @param array $data
     *
     * @return bool
     */
    public function store(array $data): bool
    {
        return  DB::insert(
            "INSERT INTO music (artist_id, title, album_name, genre, created_at, updated_at) VALUES (?,?,?,?,?,?)",
            [
                $data['artist_id'],
                $data['title'],
                $data['album_name'],
                $data['genre'],
                now(),
                now()
            ]
        );
    }

    /**
     * update music data.
     * @param array $data
     *
     * @return bool
     */
    public function update(array $data, $musicId): bool
    {
        return  DB::update(
            "UPDATE music SET artist_id = ?, title = ?, album_name = ?, genre = ?, updated_at = ? WHERE id = $musicId",
            [
                $data['artist_id'],
                $data['title'],
                $data['album_name'],
                $data['genre'],
                now(),
            ]
        );
    }

    /**
     * Delete the data from music table.
     *
     * @param int $musicId
     *
     * @return bool
     */
    public function delete(int $musicId): bool
    {
        return DB::delete( "DELETE FROM music where id=$musicId");
    }
}
