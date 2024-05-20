<?php
namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function registerUser(array $data): bool
    {
        return DB::insert('INSERT into users (first_name, last_name, email, password, gender, dob, phone, address, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)', [
            $data['first_name'],
            $data['last_name'],
            $data['email'],
            Hash::make($data['password']),
            $data['gender'],
            $data['dob'],
            $data['phone'],
            $data['address'],
            now(),
            now()
        ]);

    }
    public function getUserByEmail(string $email): array
    {
        $user = DB::select('SELECT * FROM users WHERE email = ? LIMIT 1', [$email]);

        return (array) $user[0] ?? [];
    }
}
