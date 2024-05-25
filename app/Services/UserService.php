<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserService
{
    /**
     * user registration
     *
     * @param array $data
     *
     * @return bool
     */
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
    /**
     * get user by eamil
     *
     * @param string $email
     *
     * @return array
     */
    public function getUserByEmail(string $email): array
    {
        $user = DB::select('SELECT * FROM users WHERE email = ? LIMIT 1', [$email]);
        return !empty($user) ? (array) $user[0] : [];
    }


    /**
     * Get user by id
     *
     * @param int $userId
     *
     * @return array
     */
    public function getUserById(int $userId): array
    {
        $user = DB::select('SELECT id, first_name, last_name, email, phone, dob, gender, address FROM users WHERE id = ? LIMIT 1', [$userId]);
        return !empty($user) ? (array) $user[0] : [];
    }



    /**
     * Delete user
     *
     * @param string $userEmail
     *
     * @return bool
     */
    public function delete(string $userEmail): bool
    {
        return DB::delete("DELETE FROM users where email = '$userEmail'");
    }

    /**
     * Get all users
     *
     * @return array
     */
    public function getAllUser(): array
    {
        $allUsers = DB::select("SELECT
            CONCAT(first_name, ' ', last_name) as full_name,
            id, first_name, last_name, email, phone, dob, gender, address
            FROM users;");
        return $allUsers;
    }


    /**
     * Update user data
     *
     * @param array $data
     * @param int $userId
     *
     * @return bool
     */
    public function update(array $data, int $userId): bool
    {
        return DB::update(
            "UPDATE users
         SET first_name = ?,
             last_name = ?,
             email = ?,
             gender = ?,
             dob = ?,
             phone = ?,
             address = ?,
             updated_at = ?
         WHERE id = ?",
            [
                $data['first_name'],
                $data['last_name'],
                $data['email'],
                $data['gender'],
                $data['dob'],
                $data['phone'],
                $data['address'],
                now(),
                $userId
            ]
        );
    }

    /**
     * Update Password
     *
     * @param string $data
     * @param int $id
     *
     * @return bool
     */
    public function updatePassword(string $data, int $id): bool
    {
        $password = Hash::make($data);
        return DB::update("UPDATE users SET password = ?, updated_at = ? where id = $id", [$password, now()]);
    }
}
