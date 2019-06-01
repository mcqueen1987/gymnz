<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gym extends Model
{
    protected $tableName = "gyms";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'org_id', 'created_by'
    ];
}
