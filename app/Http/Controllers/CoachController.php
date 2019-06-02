<?php

namespace App\Http\Controllers;

use App\Coach;
use App\User;
use App\Gym;
use Auth;
use Hash;
use Illuminate\Http\Request;

/**
 * Class CoachController
 * @package App\Http\Controllers
 */
class CoachController extends Controller
{

    /**
     * @param $gym_id gym id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($gym_id)
    {
        $ret = Coach::with('user')->where("gym_id", "=", $gym_id)->get();
        if($ret){
            return response()->json($ret, 200);
        }
        return response()->json(array('message'=>'fail'), 500);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $gym_id)
    {

        $userId = Auth::User()->id;

        $coachData = $request->only('name', 'email', 'password');
        // 1.create coach row
        $coach = new Coach([
            'created_by' => $userId,
            // need to save gym_id?
        ]);

        // 2.create coach user
        $user = new User();
        $user->password = Hash::make($coachData['password']);
        $user->email = $coachData['email'];
        $user->name = $coachData['name'];
        $user->save();

        // 3.map coach=>user
        $coach->user()->associate($user);

        // 4.map coach=>gym
        $gym = Gym::find($gym_id);
        $coach->gym()->associate($gym);

        $coach->save();

        if ($coach) {
            return response()->json($coach, 200);
        } else {
            return response()->json(array('message' => 'fail'), 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
