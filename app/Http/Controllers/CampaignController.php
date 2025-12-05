<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Jobs\SendCampaignEmail;
use Inertia\Inertia;
use App\Models\Campaign;
use App\Models\Contact;
use Illuminate\Support\Facades\Request;

class CampaignController extends Controller
{
    public function index()
    {
        $campaigns = Campaign::with('recipients.contact')->get();
        return Inertia::render('Campaigns/Index', [
            'campaigns' => $campaigns,
        ]);
    }

    public function create()
    {
        $contacts = Contact::all();
        return Inertia::render('Campaigns/Create', [
            'contacts' => $contacts,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'subject' => 'required|string|max:255',
            'body' => 'required|string',
            'recipients' => 'required|array',
            'recipients.*' => 'exists:contacts,id',
        ]);

        $campaign = Campaign::create([
            'subject' => $data['subject'],
            'body' => $data['body'],
        ]);

        foreach ($data['recipients'] as $contactId) {
            $recipient = $campaign->recipients()->create([
                'contact_id' => $contactId,
            ]);
            SendCampaignEmail::dispatch($recipient);
        }

        return redirect()->route('campaigns.index')->with('success', 'Campaign queued!');
    }

    public function show(Campaign $campaign)
    {
        $campaign->load('recipients.contact');
        return Inertia::render('Campaigns/Show', [
            'campaign' => $campaign,
        ]);
    }
}
