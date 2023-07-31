import NameEventConstant from "../check_event/NameEventConstant";

export interface IRoute {
  path: string;
  name: string;
  role?: string;
  icon?: string;
  isSidebar?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isUpdating?: boolean;
  isAuth?: boolean;
  isSSR?: boolean;
  children?: IRoute[];
}

const routes: IRoute[] = [
  // {
  //   path: Config.PATHNAME.LOGIN,
  //   name: "Auth",
  //   isAuth: true,
  // },
  // {
  //   path: "/approve-news",
  //   name: "sidebar.approve_new",
  //   role: ["admin"],
  //   icon: "usd_coin_usdc",
  //   isPrivate: true,
  //   isSidebar: true,
  // },
  {
    path: "/account-manager",
    name: "Quản lý nhân sự (Admin)",
    role: NameEventConstant.PERMISSION_USER_KEY.LIST_ALL_USER,
    isPrivate: true,
    icon: "Users",
    isSidebar: true,
  },
  {
    path: "/staff",
    name: "Quản lý nhân sự (HR)",
    role: NameEventConstant.PERMISSION_USER_KEY.LIST_ALL_USER_BASIC_INFO,
    isPrivate: true,
    icon: "Staff",
    isSidebar: true,
  },
  {
    path: "/manager-salary",
    name: "Quản lý bảng lương",
    role: NameEventConstant.PERMISSION_SALARY_MANAGER_KEY.LIST_ALL_SALARY,
    isPrivate: true,
    icon: "ManagePayroll",
    isSidebar: true,
  },
  {
    path: "/salary",
    name: "Bảng lương cá nhân",
    icon: "Payroll",
    isPrivate: true,
    isSidebar: true,
  },
  {
    path: "/salary-user",
    name: "Duyệt lương nhân viên",
    role: NameEventConstant.PERMISSION_SALARY_APPROVAL_KEY
      .LIST_ALL_SALARY_APPROVAL,
    isPrivate: true,
    icon: "AcceptPayroll",
    isSidebar: true,
  },
  {
    path: "/leave-work",
    name: "Quản lý nghỉ phép",
    role: NameEventConstant.PERMISSION_ON_LEAVE_KEY.LIST_ALL_ON_LEAVE,
    isPrivate: true,
    icon: "ManageLeave",
    isSidebar: true,
  },
  {
    path: "/leave-work-user",
    name: "Đơn xin nghỉ phép",
    role: NameEventConstant.PERMISSION_ON_LEAVE_KEY.LIST_ALL_ON_LEAVE_USER,
    isPrivate: true,
    icon: "Leave",
    isSidebar: true,
  },
  {
    path: "/event",
    name: "Sự kiện công ty",
    role: NameEventConstant.PERMISSION_EVENT_KEY.LIST_ALL_EVENT,
    isPrivate: true,
    icon: "Event",
    isSidebar: true,
  },
  {
    path: "/",
    name: "Sinh nhật",
    isPrivate: true,
    icon: "Birthday",
    isSidebar: true,
  },
  {
    path: "/profile-account",
    name: "Thông tin tài khoản",
    isPrivate: true,
    icon: "User",
    isSidebar: true,
  },
  {
    path: "/rule",
    name: "Nội quy - Quy định",
    isPrivate: true,
    icon: "Rules",
    isSidebar: true,
  },
  {
    path: "/work-schedule",
    name: "Lịch làm việc",
    isPrivate: true,
    role: NameEventConstant.PERMISSION_WORK_CALENDAR_KEY.LIST_ALL,
    icon: "CalenderWork",
    isSidebar: true,
  },
  {
    path: "",
    name: "Dự án",
    icon: "Project",
    isPrivate: true,
    isSidebar: true,
    children: [
      {
        path: "/project",
        name: "DS dự án",
        role: NameEventConstant.PERMISSION_PROJECT_KEY.LIST_PROJECT_OWN,
        icon: "",
        isPrivate: true,
        isSidebar: true,
      },
      {
        path: "/project-importance",
        name: "DS dự án quan trọng",
        icon: "",
        isPrivate: true,
        isSidebar: true,
      },
      {
        path: "/list-member-by-project",
        name: "DS thành viên theo dự án",
        role: NameEventConstant.PERMISSION_PROJECT_KEY.LIST_ALL,
        icon: "",
        isPrivate: true,
        isSidebar: true,
      },
    ],
  },
  {
    path: "",
    name: "Cài đặt",
    icon: "Setting",
    isSidebar: true,
    isPrivate: true,
    children: [
      {
        path: "/position",
        name: "Chức vụ",
        icon: "",
        role: NameEventConstant.PERMISSION_POSITION_KEY.LIST_ALL,
        isSidebar: true,
      },
      {
        path: "/work-type",
        name: "Loại hình làm việc",
        icon: "",
        role: NameEventConstant.PERMISSION_WORK_TYPE.LIST_ALL,
        isPrivate: true,
        isSidebar: true,
      },
      {
        path: "/other-salary",
        name: "Lương khác",
        icon: "",
        role: NameEventConstant.PERMISSION_OTHER_SALARY.MANAGER_OTHER_SALARY,
        isPrivate: true,
        isSidebar: true,
      },
      {
        path: "/permission",
        name: "Phân quyền",
        icon: "",
        role: NameEventConstant.PERMISSION_ROLE_KEY.LIST_ROLE,
        isPrivate: true,
        isSidebar: true,
      },
      {
        path: "/system-config",
        name: "Tùy chỉnh hệ thống",
        icon: "",
        role: NameEventConstant.PERMISSION_SYSTEM_CONFIG.SYSTEM_CONFIG,
        isPrivate: true,
        isSidebar: true,
      },
    ],
  },
];

export default routes;
