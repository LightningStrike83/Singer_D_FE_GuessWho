<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Character;


class CharacterController extends Controller {
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    public function getAll() {
        $characters = Character::select('id', 'name', 'game')->orderBy('name', 'asc')->get();
        return response()->json($characters);
    }

     public function getOne($game){
        $characters = Character::select('id', 'name', 'game')->where('game', '=', $game)->orderBy('name', 'asc')->get();
        return response()->json($characters);
    }

    public function getAnnas(){
        $characters = Character::select('id', 'name', 'game')->where('name', '=', 'Anna')->orderBy('game', 'asc')->get();
        return response()->json($characters);
    }
}



