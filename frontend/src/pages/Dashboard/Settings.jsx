import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Globe,
  Monitor,
  Lock,
  Eye,
  EyeOff,
  Save,
  X,
  Building,
  Camera,
  Smartphone,
  Mail,
  MessageSquare,
  Clock,
  Calendar,
  Palette,
} from "lucide-react";
import {
  getUserSettings,
  updateUserSettings,
  updatePassword,
} from "../../utils/api";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register: registerGeneral,
    handleSubmit: handleSubmitGeneral,
    reset: resetGeneral,
  } = useForm();

  const {
    register: registerNotifications,
    handleSubmit: handleSubmitNotifications,
    reset: resetNotifications,
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: errorsPassword },
  } = useForm();

  // Fetch settings on component mount
  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const settingsData = await getUserSettings();
      setSettings(settingsData);

      // Reset forms with fetched data
      resetGeneral(settingsData);
      resetNotifications(settingsData);
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  }, [resetGeneral, resetNotifications]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Handle general settings update
  const onSubmitGeneral = async (data) => {
    try {
      setUpdating(true);
      const updatedSettings = await updateUserSettings(data);
      setSettings(updatedSettings);
      toast.success("General settings updated successfully!");
    } catch (error) {
      console.error("Error updating general settings:", error);
      toast.error(error.response?.data?.message || "Failed to update settings");
    } finally {
      setUpdating(false);
    }
  };

  // Handle notifications settings update
  const onSubmitNotifications = async (data) => {
    try {
      setUpdating(true);
      const updatedSettings = await updateUserSettings({
        notifications: data.notifications,
      });
      setSettings(updatedSettings);
      toast.success("Notification settings updated successfully!");
    } catch (error) {
      console.error("Error updating notification settings:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update notification settings"
      );
    } finally {
      setUpdating(false);
    }
  };

  // Handle password update
  const onSubmitPassword = async (data) => {
    try {
      setUpdating(true);
      await updatePassword(data);
      resetPassword();
      toast.success("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setUpdating(false);
    }
  };

  // Handle cancel for each form
  const handleCancelGeneral = () => {
    resetGeneral(settings);
    toast.info("Changes cancelled");
  };

  const handleCancelNotifications = () => {
    resetNotifications(settings);
    toast.info("Changes cancelled");
  };

  const handleCancelPassword = () => {
    resetPassword();
    toast.info("Password form cleared");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const tabs = [
    {
      id: "general",
      name: "General",
      icon: SettingsIcon,
      description: "Organization settings and preferences",
    },
    {
      id: "notifications",
      name: "Notifications",
      icon: Bell,
      description: "Manage your notification preferences",
    },
    {
      id: "security",
      name: "Security",
      icon: Shield,
      description: "Password and security settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">
              Manage your application preferences and security settings
            </p>
          </div>

          {/* Tabs */}
          <div className="px-6">
            <nav className="flex space-x-8 -mb-px">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* General Settings Tab */}
          {activeTab === "general" && (
            <div>
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  General Settings
                </h2>
                <p className="text-sm text-gray-600">
                  Configure your organization settings and preferences
                </p>
              </div>

              <form
                onSubmit={handleSubmitGeneral(onSubmitGeneral)}
                className="p-6 space-y-6"
              >
                {/* Organization Settings */}
                <div className="space-y-4">
                  <h3 className="text-md font-medium text-gray-900 flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    Organization
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organization Name
                      </label>
                      <input
                        type="text"
                        {...registerGeneral("organizationName")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter organization name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organization Logo URL
                      </label>
                      <input
                        type="url"
                        {...registerGeneral("organizationLogo")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                  </div>
                </div>

                {/* Localization Settings */}
                <div className="space-y-4">
                  <h3 className="text-md font-medium text-gray-900 flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Localization
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Currency
                      </label>
                      <select
                        {...registerGeneral("defaultCurrency")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                        <option value="AUD">AUD - Australian Dollar</option>
                        <option value="JPY">JPY - Japanese Yen</option>
                        <option value="CHF">CHF - Swiss Franc</option>
                        <option value="CNY">CNY - Chinese Yuan</option>
                        <option value="INR">INR - Indian Rupee</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        {...registerGeneral("language")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="pt">Portuguese</option>
                        <option value="it">Italian</option>
                        <option value="zh">Chinese</option>
                        <option value="ja">Japanese</option>
                        <option value="ko">Korean</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        {...registerGeneral("timezone")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">
                          Pacific Time
                        </option>
                        <option value="Europe/London">London</option>
                        <option value="Europe/Paris">Paris</option>
                        <option value="Asia/Tokyo">Tokyo</option>
                        <option value="Asia/Shanghai">Shanghai</option>
                        <option value="Australia/Sydney">Sydney</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* UI Preferences */}
                <div className="space-y-4">
                  <h3 className="text-md font-medium text-gray-900 flex items-center">
                    <Palette className="w-5 h-5 mr-2" />
                    Interface Preferences
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Theme
                      </label>
                      <select
                        {...registerGeneral("theme")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Format
                      </label>
                      <select
                        {...registerGeneral("dateFormat")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Format
                      </label>
                      <select
                        {...registerGeneral("timeFormat")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="12h">12 Hour</option>
                        <option value="24h">24 Hour</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCancelGeneral}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <X className="w-4 h-4 inline mr-2" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {updating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 inline mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div>
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Notification Settings
                </h2>
                <p className="text-sm text-gray-600">
                  Choose how you want to be notified about important events
                </p>
              </div>

              <form
                onSubmit={handleSubmitNotifications(onSubmitNotifications)}
                className="p-6 space-y-6"
              >
                {/* Email Notifications */}
                <div className="space-y-4">
                  <h3 className="text-md font-medium text-gray-900 flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Email Notifications
                  </h3>

                  <div className="space-y-3">
                    {[
                      {
                        key: "leaseExpiration",
                        label: "Lease Expiration Alerts",
                        description:
                          "Get notified when leases are about to expire",
                      },
                      {
                        key: "paymentDue",
                        label: "Payment Due Reminders",
                        description:
                          "Receive alerts for upcoming rent payments",
                      },
                      {
                        key: "maintenanceUpdates",
                        label: "Maintenance Updates",
                        description:
                          "Stay informed about maintenance request status",
                      },
                      {
                        key: "systemAlerts",
                        label: "System Alerts",
                        description:
                          "Important system notifications and updates",
                      },
                      {
                        key: "newTenantRegistration",
                        label: "New Tenant Registration",
                        description: "Notification when new tenants register",
                      },
                    ].map((item) => (
                      <div key={item.key} className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            {...registerNotifications(
                              `notifications.email.${item.key}`
                            )}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3">
                          <label className="text-sm font-medium text-gray-700">
                            {item.label}
                          </label>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SMS Notifications */}
                <div className="space-y-4">
                  <h3 className="text-md font-medium text-gray-900 flex items-center">
                    <Smartphone className="w-5 h-5 mr-2" />
                    SMS Notifications
                  </h3>

                  <div className="space-y-3">
                    {[
                      {
                        key: "leaseExpiration",
                        label: "Lease Expiration Alerts",
                        description: "Get SMS alerts for expiring leases",
                      },
                      {
                        key: "paymentDue",
                        label: "Payment Due Reminders",
                        description: "SMS reminders for upcoming payments",
                      },
                      {
                        key: "maintenanceUpdates",
                        label: "Maintenance Updates",
                        description: "SMS updates for maintenance requests",
                      },
                      {
                        key: "systemAlerts",
                        label: "System Alerts",
                        description: "Critical system notifications via SMS",
                      },
                      {
                        key: "newTenantRegistration",
                        label: "New Tenant Registration",
                        description: "SMS when new tenants register",
                      },
                    ].map((item) => (
                      <div key={item.key} className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            {...registerNotifications(
                              `notifications.sms.${item.key}`
                            )}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3">
                          <label className="text-sm font-medium text-gray-700">
                            {item.label}
                          </label>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Push Notifications */}
                <div className="space-y-4">
                  <h3 className="text-md font-medium text-gray-900 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Push Notifications
                  </h3>

                  <div className="space-y-3">
                    {[
                      {
                        key: "leaseExpiration",
                        label: "Lease Expiration Alerts",
                        description:
                          "Browser push notifications for expiring leases",
                      },
                      {
                        key: "paymentDue",
                        label: "Payment Due Reminders",
                        description: "Push notifications for payment reminders",
                      },
                      {
                        key: "maintenanceUpdates",
                        label: "Maintenance Updates",
                        description:
                          "Push notifications for maintenance status",
                      },
                      {
                        key: "systemAlerts",
                        label: "System Alerts",
                        description: "Important system push notifications",
                      },
                      {
                        key: "newTenantRegistration",
                        label: "New Tenant Registration",
                        description: "Push notifications for new registrations",
                      },
                    ].map((item) => (
                      <div key={item.key} className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            {...registerNotifications(
                              `notifications.push.${item.key}`
                            )}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3">
                          <label className="text-sm font-medium text-gray-700">
                            {item.label}
                          </label>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCancelNotifications}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <X className="w-4 h-4 inline mr-2" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {updating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 inline mr-2" />
                        Save Preferences
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div>
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Security Settings
                </h2>
                <p className="text-sm text-gray-600">
                  Manage your password and security preferences
                </p>
              </div>

              <div className="p-6 space-y-8">
                {/* Password Change Form */}
                <div className="space-y-4">
                  <h3 className="text-md font-medium text-gray-900 flex items-center">
                    <Lock className="w-5 h-5 mr-2" />
                    Change Password
                  </h3>

                  <form
                    onSubmit={handleSubmitPassword(onSubmitPassword)}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          {...registerPassword("currentPassword", {
                            required: "Current password is required",
                          })}
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      {errorsPassword.currentPassword && (
                        <p className="mt-1 text-sm text-red-600">
                          {errorsPassword.currentPassword.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          {...registerPassword("newPassword", {
                            required: "New password is required",
                            minLength: {
                              value: 6,
                              message:
                                "Password must be at least 6 characters long",
                            },
                          })}
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      {errorsPassword.newPassword && (
                        <p className="mt-1 text-sm text-red-600">
                          {errorsPassword.newPassword.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          {...registerPassword("confirmPassword", {
                            required: "Please confirm your new password",
                            validate: (value, { newPassword }) =>
                              value === newPassword || "Passwords do not match",
                          })}
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      {errorsPassword.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">
                          {errorsPassword.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-end space-x-4 pt-4">
                      <button
                        type="button"
                        onClick={handleCancelPassword}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        <X className="w-4 h-4 inline mr-2" />
                        Clear
                      </button>
                      <button
                        type="submit"
                        disabled={updating}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {updating ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline mr-2"></div>
                            Updating...
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 inline mr-2" />
                            Update Password
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Security Preferences */}
                <div className="space-y-4 border-t border-gray-200 pt-6">
                  <h3 className="text-md font-medium text-gray-900 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Security Preferences
                  </h3>

                  <div className="space-y-4">
                    {/* Two-Factor Authentication */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          Two-Factor Authentication
                        </h4>
                        <p className="text-sm text-gray-500">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-3">
                          {settings?.security?.twoFactorEnabled
                            ? "Enabled"
                            : "Disabled"}
                        </span>
                        <button
                          type="button"
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            settings?.security?.twoFactorEnabled
                              ? "bg-blue-600"
                              : "bg-gray-200"
                          }`}
                          disabled
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
                              settings?.security?.twoFactorEnabled
                                ? "translate-x-5"
                                : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Login Alerts */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          Login Alerts
                        </h4>
                        <p className="text-sm text-gray-500">
                          Receive notifications for new login attempts
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-3">
                          {settings?.security?.loginAlerts
                            ? "Enabled"
                            : "Disabled"}
                        </span>
                        <button
                          type="button"
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            settings?.security?.loginAlerts
                              ? "bg-blue-600"
                              : "bg-gray-200"
                          }`}
                          disabled
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
                              settings?.security?.loginAlerts
                                ? "translate-x-5"
                                : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Session Timeout */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">
                            Session Timeout
                          </h4>
                          <p className="text-sm text-gray-500">
                            Automatically log out after period of inactivity
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {settings?.security?.sessionTimeout || 60} minutes
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Two-Factor Authentication and
                      advanced security settings are currently for display
                      purposes only. These features will be fully implemented in
                      future updates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
