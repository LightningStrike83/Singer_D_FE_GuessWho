<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GuessWhoGame extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ["id", "character1", "character2", "character3", "character4", "character5", "character6", "character7", "character8", "character9", "character10", "character11", "character12", "character13", "character14", "character15", "character16", "character17", "character18", "character19", "character20", "character21", "character22", "character23", "character24", "character25"];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}
