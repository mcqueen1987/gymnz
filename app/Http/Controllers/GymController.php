<?php

namespace App\Http\Controllers;

use App\Gym;
use App\Order;
use App\Coach;
use App\Schedule;
use Auth;

use http\Env\Response;
use Illuminate\Http\Request;

class GymController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $userId = Auth::user()->id;
        $ret = Gym::where("created_by", "=", $userId)->get();
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $userId = Auth::user()->id;
        $gym = $request->only("name", "description", "org_id");
        $gym['created_by'] = $userId;
        $ret = Gym::create($gym);
        if ($ret) {
            return response()->json($ret, 200);
        }
        return response()->json(array('message' => 'fail'), 500);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $gym = Gym::find($id);
        if (!$gym) {
            return response()->json(array('message' => 'fail'), 500);
        }
        $success = $gym->update($request->all());
        if ($success) {
            return response()->json($gym, 200);
        }
        return response()->json(array('message' => 'fail'), 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }


    public function getCustomerList($id)
    {
        // TODO permission check
        $customers = Order::with('customer')
            ->where('gym_id', '=', $id)
            ->get()
            ->pluck('customer')
            ->unique('id')
            ->toArray();
        if (is_array($customers)) {
            return response()->json($customers, 200);
        }
        return response()->json(array('message' => 'fail'), 500);
    }

    public function getAvailableTime(Request $request, $id)
    {
        $date = $request->input('date');
        if (empty($date)) {
            return response()->json(array('message' => 'missing date'), 500);
        }

        // get workinghours
        $gym = Gym::find($id);
        $workingHours = range($gym->setting['workingHours']['min'], $gym->setting['workingHours']['max'] - 1);

        // build available hours according to working hours
        $coaches = Coach::with('user')->where('gym_id', '=', $id)->get();
        // get schedules
        $schedules = Schedule::where([
            'gym_id' => $id,
            'date' => $date,
        ])->get();
        foreach ($coaches as $coach) {
            $coach['available'] = $workingHours;
            foreach ($schedules as $schedule) {
                if ($schedule->coach_id === $coach['id']) {
                    // filter scheduled hours
                    $coach['available'] = array_values(array_filter($coach['available'], function ($h) use ($schedule) {
                        return $h < $schedule->start || $h > $schedule->end;
                    }));
                }
            }
        }

        return response()->json($coaches, 200);
    }
}
