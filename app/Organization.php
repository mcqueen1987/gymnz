<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    protected $table = 'organizations';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'create_by', 'status'
    ];

    /**
     * Get the gym with the org.
     */
    public function gyms()
    {
        return $this->hasMany('App\Gym','org_id','id');
    }
}
