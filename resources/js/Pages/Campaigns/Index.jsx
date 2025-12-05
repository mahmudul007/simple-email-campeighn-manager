import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Index({ campaigns }) {
    return (
        <AuthenticatedLayout
            header="Campaigns"
        >
            <Head title="Campaigns" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Campaign History</CardTitle>
                            <Button asChild>
                                <Link href={route('campaigns.create')}>Create Campaign</Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Subject</TableHead>
                                            <TableHead>Recipients</TableHead>
                                            <TableHead>Created At</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {campaigns.map((campaign) => (
                                            <TableRow key={campaign.id}>
                                                <TableCell className="font-medium">{campaign.subject}</TableCell>
                                                <TableCell>{campaign.recipients.length}</TableCell>
                                                <TableCell>{new Date(campaign.created_at).toLocaleDateString()}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={route('campaigns.show', campaign.id)}>View Details</Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {campaigns.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={4} className="h-24 text-center">
                                                    No campaigns found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
