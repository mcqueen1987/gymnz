<?php

namespace App\Http\Controllers;

use App\Repository\Interfaces\TestInterface;

use Illuminate\Http\Request;

class TestController extends Controller
{
	
	protected $test;

	public function __construct(TestInterface $test)
	{
		$this->test = $test;	
	}
	
	public function index(Request $request)
	{
		$res = $this->test->getAll();	
		print_r($res);
	}

}
