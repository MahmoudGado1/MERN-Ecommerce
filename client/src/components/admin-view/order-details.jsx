/* eslint-disable react/prop-types */
import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[800px] h-[90vh]">
      <div className="grid gap-6">
        
        {/* Order Details in Three Columns */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div>
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div>
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div>
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div>
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div>
            <p className="font-medium">Order Status</p>
            <Badge
              className={`py-1 px-3 ${
                orderDetails?.orderStatus === "confirmed"
                  ? "bg-green-500"
                  : orderDetails?.orderStatus === "rejected"
                  ? "bg-red-600"
                  : "bg-black"
              } text-white`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </div>
        </div>


        {/* Order Items in Two Columns */}
        <div>
          <h3 className="font-medium mb-2">Order Items</h3>
          <div className="grid grid-cols-2 gap-1">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
              ? orderDetails?.cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="border p-1 rounded-lg flex justify-between"
                  >
                    <span>{item.title}</span>
                    <span>x{item.quantity}</span>
                    <span>${item.price}</span>
                  </div>
                ))
              : null}
          </div>
        </div>

        {/* Shipping Info in Two Columns */}
        <div>
          <h3 className="font-medium mb-2">Shipping Info</h3>
          <div className="grid grid-cols-2 ">
            <div>
              <p className="text-muted-foreground">Customer Name</p>
              <span>{user.userName}</span>
            </div>
            <div>
              <p className="text-muted-foreground">Address</p>
              <span>{orderDetails?.addressInfo?.address}</span>
            </div>
            <div>
              <p className="text-muted-foreground">City</p>
              <span>{orderDetails?.addressInfo?.city}</span>
            </div>
            <div>
              <p className="text-muted-foreground">Pincode</p>
              <span>{orderDetails?.addressInfo?.pincode}</span>
            </div>
            <div>
              <p className="text-muted-foreground">Phone</p>
              <span>{orderDetails?.addressInfo?.phone}</span>
            </div>
            <div>
              <p className="text-muted-foreground">Notes</p>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>

        {/* Update Order Status Form */}
        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
