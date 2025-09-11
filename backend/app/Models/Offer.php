<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $table = 'offer';
    protected $fillable = [
        'title',
        'description',
        'price',
        'status',
        'category',
        'clientsCount', 
        'validUntil',  
    ];

}


