import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Show({ campaign }) {
    const getStatusBadge = (status) => {
        switch (status) {
            case 'sent':
                return <Badge className="bg-green-500">Sent</Badge>;
            case 'failed':
                return <Badge variant="destructive">Failed</Badge>;
            default:
                return <Badge variant="secondary">Pending</Badge>;
        }
    };

    return (
        <AuthenticatedLayout
            header={`Campaign: ${campaign.subject}`}
        >
            <Head title={`Campaign: ${campaign.subject}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Campaign Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-sm text-muted-foreground">Subject</h3>
                                <p className="text-lg">{campaign.subject}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm text-muted-foreground">Body</h3>
                                <div className="p-4 bg-muted rounded-md whitespace-pre-wrap">
                                    {campaign.body}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm text-muted-foreground">Created At</h3>
                                <p>{new Date(campaign.created_at).toLocaleString()}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recipients & Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Contact Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Last Updated</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {campaign.recipients.map((recipient) => (
                                            <TableRow key={recipient.id}>
                                                <TableCell className="font-medium">
                                                    {recipient.contact ? recipient.contact.name : 'Unknown Contact'}
                                                </TableCell>
                                                <TableCell>
                                                    {recipient.contact ? recipient.contact.email : '-'}
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(recipient.status)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {new Date(recipient.updated_at).toLocaleString()}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {campaign.recipients.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={4} className="h-24 text-center">
                                                    No recipients found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button variant="outline" asChild>
                            <Link href={route('campaigns.index')}>Back to Campaigns</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
