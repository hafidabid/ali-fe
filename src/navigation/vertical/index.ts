// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboards',
      icon: 'mdi:home-outline',
      //badgeContent: 'new',
      //badgeColor: 'error',
      children: [
        {
          icon: 'mdi:chart-timeline-variant',
          title: 'Ekspansi Pasar dan Peluang Baru',
          path: '/dashboards/market-expansion'
        },
        {
          icon: 'mdi:marketplace-outline',
          title: 'Go To Market Strategy',
          path: '/dashboards/gtm'
        },
     
        {
          icon: 'mdi:people-group-outline',
          title: 'Funding & Community',
          path: '/dashboards/funding-community'
        },
      ]
    },
    {
      sectionTitle: 'Apps & Pages'
    },
    // {
    //   title: 'Email',
    //   icon: 'mdi:email-outline',
    //   path: '/apps/email'
    // },
    {
      title: 'Mentor AI',
      icon: 'mdi:message-outline',
      path: '/apps/chat'
    },
    {
      title: 'Kalender Event',
      icon: 'mdi:calendar-blank-outline',
      path: '/apps/calendar'
    },
  ]
}

export default navigation
