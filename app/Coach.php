<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Coach extends Model
{
    protected $table = 'coaches';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'gym_id', 'user_id', 'created_by'
    ];


    /**
     * Get the gym with the coach.
     */
    public function gym()
    {
        return $this->belongsTo('App\Gym');
    }

    /**
     * Get the phone record associated with the user.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
