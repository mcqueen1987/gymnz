<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $tableName = "orders";

    public function gym()
    {
        return $this->belongsTo('App\Gym');
    }

    public function customer()
    {
        return $this->belongsTo('App\User');
    }

    public function coach()
    {
        return $this->belongsTo('App\Coach');
    }

}
