<?php

namespace App\Http\Controllers;

use App\Coach;
use App\User;
use App\Gym;
use App\Order;
use Auth;
use Hash;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    const DEFAULT_PASSWORD = '12345678';
    const EMAIL_SUFFIX = '@o2-fit.com';
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($gym_id)
    {
        $ret = Order::with(['customer', 'coach'])->where("gym_id", "=", $gym_id)->get();
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

        // TODO validate

        // parepare data
        $userId = Auth::User()->id;
        $customerData = $request->only('name', 'phone', 'password');
        // convert phone to email
        $customerEmail = $customerData['phone'] . self::EMAIL_SUFFIX;

        $gym = Gym::find($request->input('gym'));
        $coach = Coach::find($request->input('coach'));

        // 1. create user if customer does not exist
        $customer = User::where('email', '=', $customerEmail)->first();
        if (empty($customer)) {
            $customer = new User();
            $customer->password = Hash::make(self::DEFAULT_PASSWORD);
            $customer->email = $customerEmail;
            $customer->name = $customerData['name'];
            $customer->save();
        }
        // 2. create order
        $order = new Order();
        $order->created_by = $userId;
        $order->price = $request->input('price');
        $order->course_amount = $request->input('amount');
        // 3. map user
        $order->customer()->associate($customer);
        // 4. map gym
        $order->gym()->associate($gym);
        // 5. map coach
        $order->coach()->associate($coach);
        // 6. return
        $order->save();
        return $order;
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
