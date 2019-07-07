<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScheduleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->integer('created_by')->unsigned();

            $table->bigInteger('customer_id')->unsigned();
            $table->foreign('customer_id')
                ->references('id')
                ->on('users')
                ->onDelete('CASCADE');

            $table->bigInteger('coach_id')->unsigned();
            $table->foreign('coach_id')
                ->references('id')
                ->on('coaches')
                ->onDelete('CASCADE');

            $table->bigInteger('gym_id')->unsigned();
            $table->foreign('gym_id')
                ->references('id')
                ->on('gyms')
                ->onDelete('CASCADE');

            $table->date('date');
            
            $table->integer('start')->comment('use int to indicate start time, every 1 unit is 15 mins');
            $table->integer('end')->comment('use int to indicate end time, every 1 unit is 15 mins');

            // 1: init 
            // 2: complete
            $table->integer('status')->default(1);

            // do not use foreign key since it can be null if it is a trial schedule
            $table->bigInteger('order_id')->unsigned()->default(0);

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
        Schema::dropIfExists('schedules');
    }
}
