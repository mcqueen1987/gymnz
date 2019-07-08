<?php

namespace App\Repository\Repositories;

use App\Repository\Interfaces\TestInterface;

class TestRepository implements TestInterface{
	
	public function getAll()
	{
		return 'all';	
	}

	public function find($id)
	{
		return $id;	
	}

	public function first()
	{
		return 'first';	
	}

}
