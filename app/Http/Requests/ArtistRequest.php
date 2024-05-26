<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArtistRequest extends FormRequest
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
        return [
            'name' => 'required',
            'dob' => 'required|date|after_or_equal:1901-01-01',
            'gender' => 'required|in:m,f,o',
            'address' => 'nullable',
            'first_release_year' => 'required|date_format:Y|digits:4|after:1901',
            'no_of_albums_released' => 'nullable|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',

        ];
    }

    /**
     * Get the validation attributes.
     *
     * @return array
     */
    public function attributes(): array
    {
        return [
            'name' => 'Artist Name',
            'dob' => 'Date of Birth',
            'gender' => 'Gender',
            'address' => 'Address',
            'first_release_year' => 'First Release Year',
            'no_of_albums_released' => 'Number of Albums Released',
            'image' => 'Image'
        ];
    }

    public function messages()
    {
        return [
            'first_release_year.date_format' => "The date should be in year."
        ];
    }
}
