<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Registered;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Organization;
use App\Gym;

class UserCreatedAction
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  Registered $event
     * @return void
     */
    public function handle(Registered $event)
    {
        $user = $event->user;
        // create default org
        $orgData = [
            'name' => 'set organization name',
            'description' => 'set organization description',
            'create_by' => $user->id,
        ];
        $org = Organization::create($orgData);

        $gymData = [
            'name' => 'your first gym',
            'description' => 'set gym description',
            'org_id' => $org->id,
            'created_by' => $user->id,
        ];
        Gym::create($gymData);
    }
}
