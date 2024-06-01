import { Skeleton } from "@/components/ui/skeleton"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  
export default function DataTableSkeleton() {
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>#</TableHead>
            <TableHead>#</TableHead>
            <TableHead className="text-right">#</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
                <TableCell colSpan={4}><Skeleton className="w-full h-4"/></TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={4}><Skeleton className="w-full h-4"/></TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={4}><Skeleton className="w-full h-4"/></TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={4}><Skeleton className="w-full h-4"/></TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={4}><Skeleton className="w-full h-4"/></TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={4}><Skeleton className="w-full h-4"/></TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={4}><Skeleton className="w-full h-4"/></TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={4}><Skeleton className="w-full h-4"/></TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={4}><Skeleton className="w-full h-4"/></TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={4}><Skeleton className="w-full h-4"/></TableCell>
            </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
  