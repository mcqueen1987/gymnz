<?php

namespace App\Http\Controllers;

use App\Organization;
use Auth;
use Log;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{
    /**
     * OrganizationController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $userId = Auth::User()->id;
        $orgList = Organization::where('create_by', '=', $userId)->get();
        if ($orgList) {
            return response()->json($orgList, 200);
        } else {
            return response()->json($orgList, 500);
        }
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
        $org = $request->only('name', 'description');
        $org['create_by'] = $userId;
        $ret = Organization::insert($org);
        if ($ret) {
            return response()->json($orgList = Organization::where('create_by', '=', $userId)->get(), 200);
        } else {
            return response()->json(array('message'=>'fail'), 500);
        }
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
