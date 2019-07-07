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
    const EMAIL_SUFFIX = '@o2-fit.com';

    /**
     * @param $gym_id gym id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($gym_id)
    {
        $ret = Coach::with('user')
            ->where("gym_id", "=", $gym_id)
            ->where("status", "=", "0")
            ->get();
        if ($ret) {
            return response()->json($ret, 200);
        }
        return response()->json(array('message' => 'fail'), 500);

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

        $coachData = $request->only('name', 'phone', 'password', 'sex');

        // convert phone to email
        $customerEmail = $coachData['phone'] . self::EMAIL_SUFFIX;

        // 1.create coach row
        $coach = new Coach([
            'created_by' => $userId,
        ]);

        // 2.create coach user
        $user = new User();
        $user->password = Hash::make($coachData['password']);
        $user->email = $customerEmail;
        $user->name = $coachData['name'];
        $user->sex = $coachData['sex'];
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
     * @param $id
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param $gymId
     * @param $coachId
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $gymId, $coachId)
    {
        $coach = new Coach();
        $coachItem =  $coach::find($coachId);
        if (!$coachItem) {
            return response()->json(array('message' => 'can not find coach_id' . $coachId), 500);
        }
        $success = $coach::where('id', $coachId)->update(
            [
                'status'=> $request['status']
            ]
        );
        if ($success) {
            return response()->json($coachItem, 200);
        }
        return response()->json(array('message' => 'fail'), 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\JsonResponse|string
     * @throws \Exception
     */
    public function destroy($id)
    {
        //
    }

    public function getCoachInfoByUserId()
    {
        $userId = Auth::User()->id;

        $ret = Coach::with('user')->where("user_id", "=", $userId)->get();

        if ($ret) {
            return response()->json($ret, 200);
        } else {
            return response()->json(array('message' => 'fail'), 500);
        }
    }
}
