<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Product extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'tbl_products';
    protected $primaryKey = 'product_id';
    protected $fillable = [
        'product_picture',
        'product_name',
        'price',
        'quantity',
    ];
}
