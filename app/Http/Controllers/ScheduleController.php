<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Gym;
use App\User;
use App\Coach;
use App\Order;
use App\Schedule;
use Auth;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $id)
    {
        // querystring [date, customer, status]
        $query = Schedule::with(['coach.user','customer'])->where('gym_id', $id);
        if($request->input('date')) {
            $query->where('date', $request->input('date'));
        }
        if($request->input('customer')) {
            $query->where('customer_id', $request->input('customer'));
        }
        if($request->input('status')) {
            $query->where('status', $request->input('status'));
        }
        $ret = $query->get();
        if($ret) {
            return response()->json($ret, 200);
        }
        return response()->json(['message' => 'failed'], 500);
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
        $userId = Auth::User()->id;

        $scheduleData = $request->only('customer', 'coach', 'gym', 'date', 'start', 'end');
        // 1. try to find avaiable orders
        $order = Order::where([
            'customer_id'=>$scheduleData['customer'],
            'gym_id'=>$scheduleData['gym'],
        ])->whereRaw('booked_amount<course_amount')->first();
        //return 404 if no available order
        if(empty($order)){
            return response()->json(['message'=> 'no available order'], 404);
        }
        // 2. create schedule
        $schedule = new Schedule();
        $schedule->created_by = $userId;
        $schedule->order_id = $order->id;
        $schedule->date = $scheduleData['date'];
        $schedule->start = $scheduleData['start'];
        $schedule->end = $scheduleData['end'];

        $schedule->customer()->associate(User::find($scheduleData['customer']));
        $schedule->coach()->associate(Coach::with('user')->find($scheduleData['coach']));
        $schedule->gym()->associate(Gym::find($scheduleData['gym']));

        $schedule->save();
        // TODO handle save error
        // 3. update order booked_amount
        $order->booked_amount ++;
        $order->save();
        
        return response()->json($schedule, 201);

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
        //
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
}
