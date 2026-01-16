<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use GuzzleHttp;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validacija podataka koji stižu sa React frontenda
        $validator = Validator::make($request->all(), [
            'sku'              => 'required|string',
            'quantity'         => 'required|integer|min:1',
            'price'            => 'required|numeric',
            'country'              => 'required|string',

            // Podaci o kupcu
            'name'             => 'required|string|max:255',
            'phone' => ['required', 'string', 'regex:/^((\+381)|(00381)|(0))[0-9]{8,10}$/'],
            'shipping_address' => 'required|string|max:255',
            'shipping_city'    => 'required|string|max:100',
            'shipping_zip'     => 'required|string|max:20',
        ], [
            // Prilagođene poruke na srpskom (opciono, jer frontend prikazuje prvu grešku)
            'required' => 'Polje :attribute je obavezno.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Podaci nisu ispravni.',
                'errors' => $validator->errors()
            ], 422);
        }

        try {

            $jsonArray = array();

            $divineProducts = ['18-NAILREPAIR'];
            $homeProducts = ['11-SCRATCHREPAIR','31-PESTREJECT'];

            if(in_array($request->sku, $divineProducts)) {
                $site = 'https://divinecareshop.com';
            } elseif(in_array($request->sku, $homeProducts)) {
                $site = 'https://homecarshop.com';
            }

            $jsonArray['site'] = $site;

            $jsonArray['number'] = null;
            $jsonArray['date_created'] = now();
            $jsonArray['total'] = $request->totalPrice;
            $jsonArray['shipping']['first_name'] = $request->name;
            $jsonArray['shipping']['address_1'] =  $request->shipping_address;
            $jsonArray['shipping']['city'] = $request->shipping_city;
            $jsonArray['shipping']['postcode'] = $request->shipping_zip;
            $jsonArray['billing']['phone'] = $request->phone;

            $jsonArray['countryCode'] = 'RS';
            $jsonArray['currency'] = 'RSD';

            if($request->boolean('freeShipping')) {
                $jsonArray['shipping_lines'] = array([
                    "method_id" => "free_shipping"
                ]);
            } else {
                $jsonArray['shipping_lines'] = array([
                    "method_id" => "flat_rate"
                ]);
            }

            $jsonArray['line_items'] = array([
                'sku' => $request->sku,
                'quantity' => $request->quantity,
                'subtotal' => $request->price,
                'total' =>  $request->price,
                'meta_data' => [],
            ]);


            $jsonArray['shipping']['last_name'] = "";
            $jsonArray['shipping']['address_2'] =  "";
            $jsonArray['billing']['email'] = "nemaemail@gmail.com";
            $jsonArray['customer_note'] = "";

            // TODO: Ovde pozovi svoj CRM servis ili sačuvaj u lokalnu bazu
            // Order::create($orderData);
            // $crmResponse = CrmService::sendOrder($orderData);

//            Log::info('Nova porudžbina primljena:', $jsonArray);

            $client = new GuzzleHttp\Client([
                'headers' => [ 'Content-Type' => 'application/json' ]
            ]);

            if(isset($request->country) && $request->country == "BA") {
                $webhookUrl = "https://bosnabraavos.ordertitans.com/api/orderWebhook";
            } else {
                $webhookUrl = "https://braavos.ordertitans.com/api/orderWebhook";
            }

            try {
                $response = $client->post($webhookUrl, ['body' => json_encode($jsonArray)]);
            } catch(\Exception $exception) {
                Log::critical("Error: Webhook accepting error \nServer message: " . $exception->getMessage() . "\nJSON: " . json_encode($jsonArray, JSON_PRETTY_PRINT));
            }

            // 3. Odgovor Frontendu
            // React lander očekuje JSON. Ako želiš da redirektuješ na Thank You stranicu:

            return response()->json([
                'success' => true,
                'message' => 'Porudžbina uspešno kreirana.',
            ], 200);

        } catch (\Exception $e) {
            Log::error('Greška prilikom kreiranja porudžbine: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Došlo je do greške na serveru. Molimo pokušajte ponovo.',
            ], 500);
        }
    }
}
