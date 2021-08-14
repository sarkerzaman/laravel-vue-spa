<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Bookable extends Model
{
    public function bookings(){
        return $this->hasMany(Booking::class);
    }

    public function reviews(){
        return $this->hasMany(Review::class);
    }

    public function availableForBooking($from, $to){
        return 0 == $this->bookings()->betweenDates($from, $to)->count();
    }

    public function priceFor($from, $to): array
    {
        $days = (new Carbon($from))->diffInDays(new Carbon($to)) + 1;
        $price = $days * $this->price;

        return [
            'total' => $price,
            'breakdown' => [
                $this->price => $days
            ]
        ];
    }
}
