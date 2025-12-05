import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import InputError from '@/Components/InputError';
import { useState } from 'react';

export default function Create({ contacts }) {
    const { data, setData, post, processing, errors } = useForm({
        subject: '',
        body: '',
        recipients: [],
    });

    const [selectedContacts, setSelectedContacts] = useState([]);

    const toggleSelectAll = (checked) => {
        if (checked) {
            const allIds = contacts.map(contact => contact.id);
            setSelectedContacts(allIds);
            setData('recipients', allIds);
        } else {
            setSelectedContacts([]);
            setData('recipients', []);
        }
    };

    const toggleSelect = (id, checked) => {
        let newSelection;
        if (checked) {
            newSelection = [...selectedContacts, id];
        } else {
            newSelection = selectedContacts.filter(contactId => contactId !== id);
        }
        setSelectedContacts(newSelection);
        setData('recipients', newSelection);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('campaigns.store'));
    };

    return (
        <AuthenticatedLayout
            header="Create Campaign"
        >
            <Head title="Create Campaign" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Campaign Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        placeholder="Enter campaign subject"
                                    />
                                    <InputError message={errors.subject} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="body">Body</Label>
                                    <Textarea
                                        id="body"
                                        value={data.body}
                                        onChange={(e) => setData('body', e.target.value)}
                                        placeholder="Enter email body content..."
                                        className="min-h-[150px]"
                                    />
                                    <InputError message={errors.body} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Select Recipients</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border max-h-[400px] overflow-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[50px]">
                                                    <Checkbox
                                                        checked={contacts.length > 0 && selectedContacts.length === contacts.length}
                                                        onCheckedChange={toggleSelectAll}
                                                    />
                                                </TableHead>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Email</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {contacts.map((contact) => (
                                                <TableRow key={contact.id} data-state={selectedContacts.includes(contact.id) && "selected"}>
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={selectedContacts.includes(contact.id)}
                                                            onCheckedChange={(checked) => toggleSelect(contact.id, checked)}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="font-medium">{contact.name}</TableCell>
                                                    <TableCell>{contact.email}</TableCell>
                                                </TableRow>
                                            ))}
                                            {contacts.length === 0 && (
                                                <TableRow>
                                                    <TableCell colSpan={3} className="h-24 text-center">
                                                        No contacts found.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="text-sm text-muted-foreground">
                                        {selectedContacts.length} recipient(s) selected.
                                    </div>
                                    <InputError message={errors.recipients} />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing || selectedContacts.length === 0}>
                                {processing ? 'Creating...' : 'Create & Send Campaign'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
