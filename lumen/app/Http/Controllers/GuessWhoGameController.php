<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\GuessWhoGame;

use App\Models\Character;


class GuessWhoGameController extends Controller {
    /**
     * Create a new controller instance.
     *
     * @return void
     */

public function getOne($id) {
    $guesswho = GuessWhoGame::where('id', $id)->first();
    
    if (!$guesswho) {
        return response()->json(['error' => 'GuessWhoGame not found'], 404);
    }
    
    $characterData = [];
    
    for ($i = 1; $i <= 25; $i++) {
        $characterNumber = $guesswho->{"character$i"};
        $character = Character::where('id', $characterNumber)->first(); // Querying the model directly
        
        if ($character) {
            $characterData[] = [
                'id' => $character->id,
                'name' => $character->name
            ];
        }
    }
    
    return response()->json($characterData);
}

    
    

    public function save(Request $request) {
        $this->validate($request, [
            'character1' => 'required',
            'character2' => 'required',
            'character3' => 'required',
            'character4' => 'required',
            'character5' => 'required',
            'character6' => 'required',
            'character7' => 'required',
            'character8' => 'required',
            'character9' => 'required',
            'character10' => 'required',
            'character11' => 'required',
            'character12' => 'required',
            'character13' => 'required',
            'character14' => 'required',
            'character15' => 'required',
            'character16' => 'required',
            'character17' => 'required',
            'character18' => 'required',
            'character19' => 'required',
            'character20' => 'required',
            'character21' => 'required',
            'character22' => 'required',
            'character23' => 'required',
            'character24' => 'required',
            'character25' => 'required',
        ]);
        $guesswho = GuessWhoGame::create($request->all());
        return response()->json($guesswho, 201);
    }
}

