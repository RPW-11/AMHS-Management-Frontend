import MissionCategoryBadge from '@/components/mission/mission-category-badge'
import MissionStatusBadge from '@/components/mission/mission-status'
import TableViewActionButtons from '@/components/mission/table-view-action-buttons'
import Pagination from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Mission } from '@/types/mission'
import { parsedTimeStampToDateTime } from '@/utils/general-util'
import React, { useState } from 'react'

interface TableViewProps {
    missions: Mission[]
}

const TableView = ({
    missions
}: TableViewProps) => {
    const [currentStatus, setCurrentStatus] = useState<string>('All');
    return (
        <div className='space-y-4'>
            <div className="flex justify-between items-center">
                <div className="border rounded-md w-fit overflow-hidden">
                    <Button size={"sm"} className='rounded-none' variant={"secondary"}>All</Button>
                    <Button size={"sm"} className='rounded-none' variant={"ghost"}>Active</Button>
                    <Button size={"sm"} className='rounded-none' variant={"ghost"}>Finished</Button>
                    <Button size={"sm"} className='rounded-none' variant={"ghost"}>Inactive</Button>
                </div>
                <Input placeholder='Search mission...' className='w-72'/>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead><Checkbox/></TableHead>
                        <TableHead>No</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Updated At</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {missions.length > 0 ?
                    missions.map((mission, i) => (
                        <TableRow key={mission.id}>
                            <TableCell><Checkbox/></TableCell>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{mission.name}</TableCell>
                            <TableCell>
                                <MissionCategoryBadge category={mission.category} />
                            </TableCell>
                            <TableCell>
                                <MissionStatusBadge status={mission.status} />
                            </TableCell>
                            <TableCell>{parsedTimeStampToDateTime(mission.updatedAt)}</TableCell>
                            <TableCell>
                                <TableViewActionButtons mission={mission}/>
                            </TableCell>
                        </TableRow>
                    )) :
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            No missions available.
                        </TableCell>
                    </TableRow>
                    }
                </TableBody>
            </Table>
            <Pagination/>
        </div>
    )
}

export default TableView