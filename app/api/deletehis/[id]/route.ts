import { NextRequest, NextResponse } from 'next/server';
import connect from '@/app/lib/mongoose';
import History from '@/app/model/history';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    await connect();
    const { id } = params;

    console.log(`Attempting to delete history record with id: ${id}`);

    try {
        const deletedHistory = await History.findByIdAndDelete(id);
        if (!deletedHistory) {
            console.log(`History record not found with id: ${id}`);
            return NextResponse.json({ message: 'History record not found' }, { status: 404 });
        }
        console.log(`Successfully deleted history record with id: ${id}`);
        return NextResponse.json({ message: 'History record deleted successfully' });
    } catch (error) {
        console.error('Error deleting history record:', error);
        return NextResponse.json({ message: 'Failed to delete history record', error }, { status: 500 });
    }
}
