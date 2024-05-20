<?php

namespace App\Http\Requests;

use App\Services\ArtistService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;

class MusicRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
            $artistId = (array) DB::select('select id from artists');
            $newArtistId = collect($artistId)->pluck('id')->toArray();
            return [
                'artist_id' => sprintf('required|integer|in:%s', implode(',', $newArtistId)),
                'title' => 'required',
                'album_name' => 'required',
                'genre' => 'required|in:rnb,country,classic,rock,jazz',
            ];

    }



    /**
     * Get the validation attributes name.
     *
     * @return array
     */
    public function attributes(): array
    {
        return [
            'album_name' => "Album Name",
            'artist_id' => "Artist",
            'title' => "Title",
            "genre" => "Genre"
        ];
    }
}
