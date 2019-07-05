<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('created_by');

            $table->integer('price');
            $table->integer('course_amount');

            $table->bigInteger('customer_id')->unsigned();
            $table->foreign('customer_id')
                ->references('id')
                ->on('users')
                ->onDelete('CASCADE');

            $table->bigInteger('gym_id')->unsigned();
            $table->foreign('gym_id')
                ->references('id')
                ->on('gyms')
                ->onDelete('CASCADE');


            $table->bigInteger('coach_id')->unsigned();
            $table->foreign('coach_id')
                ->references('id')
                ->on('coaches')
                ->onDelete('CASCADE');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
