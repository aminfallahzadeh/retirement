// IMPORTS
// IMPORTS
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { logout } from "@/features/auth/authSlice";
import { useLogoutMutation } from "@/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/hooks/usePreTypesHooks";
import {
  useGetUserThemeQuery,
  useUpdateUserThemeMutation,
  useGetItemAccessQuery,
} from "@/features/user/userApi";
import { setNavPanelOpen } from "@/features/user/userSlice";
import { CustomModal } from "@/shared/components/CustomModal";
import DigitalClock from "@/components/DigitalClock";
import Date from "@/components/Date";
import { LoadingButton } from "@mui/lab";
import { Box, Tooltip } from "@mui/material";
import {
  Logout as LogoutIcon,
  ColorLensRounded as ThemeIcon,
  Done as DoneIcon,
  Close as CloseIcon,
  ArrowLeftOutlined as ArrowIcon,
} from "@mui/icons-material";
import { toastConfig } from "@/config/toast/toast-config";
import { Permission } from "@/shared/types/domain/user";
import { TreeItem } from "../../types";

export const NavBar = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  // STATES
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [theme, setTheme] = useState("default");
  const [itemList, setItemList] = useState<TreeItem[]>([]);

  // CONSTS
  const { userID } = useAppSelector((state) => state.auth);
  const { refreshToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const shouldFetch = !!userID;
  const [updateUserTheme] = useUpdateUserThemeMutation();
  const [logoutApi, { isLoading: logoutLoading }] = useLogoutMutation();
  const { data: user, refetch: userRefetch } = useGetUserThemeQuery({
    skip: !shouldFetch,
  });

  // GET THEME WHENEVER PAGE LOADS
  useEffect(() => {
    if (shouldFetch) {
      userRefetch();
    }
  }, [userRefetch, shouldFetch]);

  // LOGOUT FUNCTION
  const logoutHandler = async () => {
    const res = await logoutApi({ refreshToken });
    dispatch(logout());
    toastConfig.success(res.data.message);
  };

  // FUNCTION TO CREATE DATA TREE
  const createTree = (items: Permission[]) => {
    const itemMap: { [key: string]: TreeItem } = {};
    const nestedItems: TreeItem[] = [];

    // Create a mapping of items by their ID
    items.forEach((item) => {
      itemMap[item.itemID] = { ...item, children: [] };
    });

    // Build the nested structure
    items.forEach((item) => {
      const parentID = item.parentID;
      if (parentID === "0") {
        // This is a top-level item
        nestedItems.push(itemMap[item.itemID]);
      } else if (itemMap[parentID]) {
        // If the parent exists, add the item to its parent's children
        itemMap[parentID].children.push(itemMap[item.itemID]);
      }
    });

    return nestedItems;
  };

  const renderChildren = (itemList: TreeItem[], activePanel: string | null) => {
    const activeItem = itemList.find((item) => item.itemID === activePanel);

    if (activeItem && activeItem.children.length > 0) {
      return (
        <ul className="nav__panel--list">
          {activeItem.children.map((child) => (
            <li
              key={child.itemID}
              className={isActivePath(child.url) ? "active" : ""}
            >
              <Link to={`/retirement/${child.url}`}>{child.itemName}</Link>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  const baseURL = "/retirement/";
  const isActivePath = (path: string) => location.pathname === baseURL + path;

  const {
    data: permissionsList,
    isSuccess: isPermissionsSuccess,
    isLoading: isPermissionsLoading,
    isFetching: isPermissionsFetching,
    refetch,
  } = useGetItemAccessQuery();

  useEffect(() => {
    refetch();
    if (isPermissionsSuccess) {
      const tree = createTree(permissionsList.itemList);
      setItemList(tree);
    }
  }, [isPermissionsSuccess, permissionsList, dispatch, refetch]);

  const handleShowLogoutModalChange = () => {
    setShowLogoutModal(true);
  };

  const handlePanelToggle = (panel: string | null) => {
    setActivePanel((prev) => {
      const newPanel = prev === panel ? null : panel;
      setTimeout(() => {
        dispatch(setNavPanelOpen(newPanel !== null));
      }, 0);
      return newPanel;
    });
  };

  const handleThemeChange = async (value: string) => {
    if (theme === value) return;

    const selectedTheme = value;
    setTheme(selectedTheme);
    await updateUserTheme({
      userID,
      theme: selectedTheme,
    }).unwrap();
  };

  useEffect(() => {
    document.documentElement.setAttribute("color-scheme", theme);
  }, [theme]);

  useEffect(() => {
    if (user) {
      setTheme(user.itemList[0].theme);
    }
  }, [user]);

  return (
    <>
      <CustomModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="خروج"
      >
        <p className="paragraph-primary text-center m-5">
          آیا از خروج اطمینان دارید؟
        </p>

        <div className="flex-row flex-center">
          <LoadingButton
            dir="ltr"
            endIcon={<DoneIcon />}
            loading={logoutLoading}
            onClick={logoutHandler}
            variant="contained"
            color="success"
          >
            <span>بله</span>
          </LoadingButton>
          <LoadingButton
            dir="ltr"
            endIcon={<CloseIcon />}
            onClick={() => setShowLogoutModal(false)}
            variant="contained"
            loading={logoutLoading}
            color="error"
          >
            <span>خیر</span>
          </LoadingButton>
        </div>
      </CustomModal>

      <nav className="nav">
        <div className="nav__links">
          <>
            {isPermissionsLoading || isPermissionsFetching ? (
              <div className="nav__links--loading">در حال بارگذاری ...</div>
            ) : (
              <ul className="nav__links--list">
                {itemList.map((item) =>
                  item.children.length === 0 ? (
                    <li
                      key={item.itemID}
                      className={isActivePath(item.url) ? "active" : ""}
                      onClick={() => handlePanelToggle(null)}
                    >
                      <Link to={baseURL + item.url}>{item.itemName}</Link>
                    </li>
                  ) : (
                    <li
                      key={item.itemID}
                      className={isActivePath(item.itemID) ? "active" : ""}
                      onClick={() => handlePanelToggle(item.itemID)}
                    >
                      <a>{item.itemName}</a>
                      <ArrowIcon
                        sx={{
                          color: "#fff",
                          transition: "all 0.25s ease",
                          transform:
                            activePanel === item.itemID ? "rotate(-90deg)" : "",
                        }}
                      />
                    </li>
                  )
                )}
              </ul>
            )}
          </>
        </div>

        <div className="nav__profile">
          <ul className="nav__profile--list">
            <li onClick={handleShowLogoutModalChange}>
              <Tooltip
                title={
                  <span style={{ fontFamily: "sahel", fontSize: "12px" }}>
                    خروج
                  </span>
                }
              >
                <LogoutIcon />
              </Tooltip>
            </li>

            <li className="nav__profile--theme">
              <div className="nav__profile--theme-icon">
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ThemeIcon />
                </Box>
              </div>

              <div className="nav__profile--theme-dropdown">
                <div
                  className={
                    "theme-choice" +
                    (theme === "default" ? " selectedTheme" : "")
                  }
                  onClick={() => handleThemeChange("default")}
                >
                  <div className="theme-choice__color" data-theme="a"></div>
                </div>

                <div
                  className={
                    "theme-choice" +
                    (theme === "chocolate" ? " selectedTheme" : "")
                  }
                  onClick={() => handleThemeChange("chocolate")}
                >
                  <div className="theme-choice__color" data-theme="b"></div>
                </div>

                <div
                  className={
                    "theme-choice" + (theme === "green" ? " selectedTheme" : "")
                  }
                  onClick={() => handleThemeChange("green")}
                >
                  <div className="theme-choice__color" data-theme="c"></div>
                </div>
              </div>
            </li>

            <li>
              <Tooltip title="پنل کاربر">
                <a
                  className="flex flex-col flex-center"
                  style={{
                    rowGap: "0",
                    fontSize: "12px",
                  }}
                >
                  <span>{firstName}</span>
                  <span>{lastName}</span>
                </a>
              </Tooltip>
            </li>

            <li>
              <DigitalClock />

              <Date />
            </li>
          </ul>
        </div>
      </nav>

      <div className={activePanel ? "nav__panel" : "nav__panel--hidden"}>
        {renderChildren(itemList, activePanel)}
      </div>
    </>
  );
};
