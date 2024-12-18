// rrd imports
import { Link, useLocation } from "react-router-dom";

// library imports
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

// mui imports
import {
  PersonOutlined as PersonOutlinedIcon,
  GroupOutlined as GroupOutlinedIcon,
  PaymentOutlined as PaymentOutlinedIcon,
  HomeOutlined as HomeOutlinedIcon,
  EqualizerOutlined as EqualizerOutlinedIcon,
  LightbulbOutlined as LightbulbOutlinedIcon,
  AssignmentTurnedInOutlined as AssignmentTurnedInOutlinedIcon,
  Group as GroupIcon,
  HealthAndSafetyOutlined as HealthAndSafetyOutlinedIcon,
  ArticleOutlined as RequestIcon,
} from "@mui/icons-material";

function SidebarNav() {
  const location = useLocation();

  const groupsPath = location.pathname === "/retirement/groups";
  const userPath = location.pathname === "/retirement/users";
  const batchStatementsPath =
    location.pathname === "/retirement/batch-statements";
  const personnelStatementsPath = location.pathname.startsWith(
    "/retirement/personnel-statements"
  );
  const electronicStatementPath =
    location.pathname === "/retirement/electronic-statement";
  const createRequestPath = location.pathname === "/retirement/create-request";

  const content = (
    <Sidebar rtl={true}>
      <Menu>
        <MenuItem
          component={<Link to={"/retirement/create-request"} />}
          active={createRequestPath}
          icon={<RequestIcon sx={{ color: "#ff6700" }} />}
        >
          ایجاد درخواست
        </MenuItem>
        <SubMenu
          label={<span>امور بازنشستگان</span>}
          icon={<PersonOutlinedIcon sx={{ color: "#ff6700" }} />}
        >
          <MenuItem
            component={<Link to={"/retirement/batch-statements"} />}
            active={batchStatementsPath}
          >
            {" "}
            احکام گروهی{" "}
          </MenuItem>
          <MenuItem>رویت احکام کارمندی </MenuItem>
          <MenuItem> گزارشات </MenuItem>
        </SubMenu>
        <SubMenu
          label={<span> امور مشترکین</span>}
          icon={<GroupOutlinedIcon sx={{ color: "#ff6700" }} />}
        >
          <MenuItem
            component={<Link to={"/retirement/personnel-statements"} />}
            active={personnelStatementsPath}
          >
            احکام کارمندان
          </MenuItem>
          <MenuItem>تعرفه خدمتی کارمندان</MenuItem>
          <MenuItem>انتقال کسور</MenuItem>
          <MenuItem>تسویه کسور</MenuItem>
          <MenuItem>استعلام سابقه کارمند</MenuItem>
          <MenuItem>محاسبه کسور معوقه</MenuItem>
          <MenuItem>رویت مقرری ماه اول</MenuItem>
        </SubMenu>

        <SubMenu
          label={<span>حقوق و دستمزد</span>}
          icon={<PaymentOutlinedIcon sx={{ color: "#ff6700" }} />}
        >
          <MenuItem>فیش های حقوقی</MenuItem>
          <MenuItem>اعمال تسهیلات کشوری</MenuItem>
          <MenuItem>تولید فایل حقوق</MenuItem>
          <MenuItem>تولید فایل ریز اقساط</MenuItem>
          <MenuItem>رویت فیش های مزایا</MenuItem>
        </SubMenu>
        <MenuItem icon={<GroupIcon sx={{ color: "#ff6700" }} />}>
          اجتماعی
        </MenuItem>
        <MenuItem icon={<HomeOutlinedIcon sx={{ color: "#ff6700" }} />}>
          رفاهی
        </MenuItem>
        <MenuItem
          icon={<HealthAndSafetyOutlinedIcon sx={{ color: "#ff6700" }} />}
        >
          سلامت
        </MenuItem>
        <MenuItem icon={<EqualizerOutlinedIcon sx={{ color: "#ff6700" }} />}>
          مدیریت سیستم
        </MenuItem>

        <SubMenu
          label={<span>اطلاعات پایه</span>}
          icon={<LightbulbOutlinedIcon sx={{ color: "#ff6700" }} />}
        >
          <MenuItem
            component={<Link to="/retirement/groups" />}
            active={groupsPath}
          >
            گروه ها
          </MenuItem>
          <MenuItem
            component={<Link to="/retirement/users" />}
            active={userPath}
          >
            کاربران
          </MenuItem>
          <MenuItem
            component={<Link to="/retirement/electronic-statement" />}
            active={electronicStatementPath}
          >
            پرونده الکترونیک
          </MenuItem>
        </SubMenu>

        <MenuItem
          icon={<AssignmentTurnedInOutlinedIcon sx={{ color: "#ff6700" }} />}
        >
          گزارشات
        </MenuItem>
      </Menu>
    </Sidebar>
  );
  return content;
}

export default SidebarNav;
