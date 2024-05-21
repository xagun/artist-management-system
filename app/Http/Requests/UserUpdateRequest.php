<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
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
                'first_name' => 'required',
                'last_name' => 'required',
                'email' => 'required|email:filter|unique:users,email,' . $this->route('id'),
                'password' => 'nullable|string|min:8|confirmed',
                'phone' => 'required|digits:10',
                'dob' => 'required|date',
                'gender' => 'required|in:m,f,o',
                'address' => 'nullable|string'
            ];

    }
}
