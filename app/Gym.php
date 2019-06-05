<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gym extends Model
{
    protected $tableName = "gyms";

    protected $casts = [
        'setting' => 'array'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'org_id', 'created_by', 'setting'
    ];

    /**
     * Get the coach for the gym.
     */
    public function coaches()
    {
        return $this->hasMany('App\Coach');
    }
}
