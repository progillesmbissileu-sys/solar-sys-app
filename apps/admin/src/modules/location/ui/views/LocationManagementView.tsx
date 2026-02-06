import { Fragment } from "react"
import { AppTable } from "@/shared/ui/organisms/AppTable"

const data = [
  {
    key: "1",
    label: "Asia",
    data: [
      {
        company: "Real Estate Group",
        size: "1.2M USD",
        probability: "100%",
        duration: "6 months",
        status: "Closed",
        assigned: [
          {
            name: "Lena Mayer",
            initials: "L",
          },
          {
            name: "Sara Brick",
            initials: "S",
          },
        ],
      },
      {
        company: "Grison Appartments",
        size: "100K USD",
        probability: "20%",
        duration: "12 months",
        status: "Drafted",
        assigned: [
          {
            name: "Jordan Afolter",
            initials: "J",
          },
          {
            name: "Corinna Bridge",
            initials: "C",
          },
        ],
      },
      {
        company: "Tokyo Tech Solutions",
        size: "750K USD",
        probability: "85%",
        duration: "24 months",
        status: "Sent",
        assigned: [
          {
            name: "Lena Mayer",
            initials: "L",
          },
          {
            name: "Jordan Corner",
            initials: "J",
          },
        ],
      },
      {
        company: "Singapore Systems Ltd",
        size: "300K USD",
        probability: "75%",
        duration: "18 months",
        status: "Drafted",
        assigned: [
          {
            name: "Sara Bridge",
            initials: "S",
          },
        ],
      },
      {
        company: "Seoul Digital Corp",
        size: "880K USD",
        probability: "95%",
        duration: "30 months",
        status: "Sent",
        assigned: [
          {
            name: "Corinna Berner",
            initials: "C",
          },
          {
            name: "Lena Mayer",
            initials: "L",
          },
        ],
      },
      {
        company: "Mumbai Innovations",
        size: "450K USD",
        probability: "40%",
        duration: "12 months",
        status: "Drafted",
        assigned: [
          {
            name: "Jordan Afolter",
            initials: "J",
          },
        ],
      },
    ],
  },
  {
    key: "2",
    label: "North America",
    data: [
      {
        company: "Liquid Holdings Group",
        size: "5.1M USD",
        probability: "100%",
        duration: "Member",
        status: "Closed",
        assigned: [
          {
            name: "Charlie Anuk",
            initials: "C",
          },
        ],
      },
      {
        company: "Craft Labs, Inc.",
        size: "80-90K USD",
        probability: "80%",
        duration: "18 months",
        status: "Sent",
        assigned: [
          {
            name: "Charlie Anuk",
            initials: "C",
          },
          {
            name: "Patrick Daller",
            initials: "P",
          },
        ],
      },
      {
        company: "Toronto Tech Hub",
        size: "250K USD",
        probability: "65%",
        duration: "12 months",
        status: "Drafted",
        assigned: [
          {
            name: "Patrick Daller",
            initials: "P",
          },
          {
            name: "Charlie Anuk",
            initials: "C",
          },
        ],
      },
      {
        company: "Silicon Valley Startups",
        size: "1.5M USD",
        probability: "90%",
        duration: "24 months",
        status: "Sent",
        assigned: [
          {
            name: "Charlie Anuk",
            initials: "C",
          },
        ],
      },
      {
        company: "NYC Digital Solutions",
        size: "750K USD",
        probability: "70%",
        duration: "15 months",
        status: "Drafted",
        assigned: [
          {
            name: "Patrick Daller",
            initials: "P",
          },
        ],
      },
    ],
    count: 5,
  },
]

export default function LocationManagementView() {
  return (
    <Fragment>
      <AppTable<{
        company: string
        size: string
        probability: string
        duration: string
        status: string
      }>
        columns={[
          {
            key: "company",
            title: "Company",
            dataIndex: "company",
          },
          {
            key: "size",
            title: "Size",
            dataIndex: "size",
          },
          {
            key: "probability",
            title: "Probability",
            dataIndex: "probability",
          },
          {
            key: "duration",
            title: "Duration",
            dataIndex: "duration",
          },
          // {
          //   key: "status",
          //   title: "Status",
          //   render: (value) => (
          //     <Badge className="rounded-sm">{value.status}</Badge>
          //   ),
          // },
        ]}
        groupedSource={data}
      />
    </Fragment>
  )
}
