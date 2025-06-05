<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;

class Product extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'tbl_products';
    protected $primaryKey = 'product_id';
    protected $fillable = [
        'category_id',
        'product_picture',
        'product_name',
        'price',
    ];

    public function categories(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');  
    }
}
