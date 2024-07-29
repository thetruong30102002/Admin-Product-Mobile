
import Mobile from "../models/mobileModel";
import { createValidate, updateValidate } from "../validations/mobile";


class MobileController {
    async getAllMobile(req, res) {
        try {
            const mobile = await Mobile.find();
            res.status(200).json({
                message: "Hiển thị thành công",
                data: mobile
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
    async detailMobile(req, res) {
        try {
            const mobile = await Mobile.findById(req.params.id);
            res.status(200).json({
                message: "Hiển thị thành công",
                data: mobile
            });
            if (!mobile) {
                return res.status(404).json({
                    message: "Not Found",
                })
            }
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
    async createMobile(req, res) {
        try {
            const mobileData = { ...req.body };
            const { error } = createValidate.validate(req.body);
            if (error) {
                const errors = error.details.map((err) => err.message);
                return res.status(400).json({
                    message: errors,
                })
            }

            const mobile = await Mobile.create(mobileData);
            res.status(200).json({
                message: "Thêm thành công",
                data: mobile
            });
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
    async updateMobile(req, res) {
        try {
            const mobileId = req.params.id;
            const mobileData = req.body;
            const { error } = updateValidate.validate(req.body);
            if (error) {
                const errors = error.details.map((err) => err.message);
                return res.status(400).json({
                    message: errors,
                })
            }
            const updateMobile = await Mobile.findByIdAndUpdate(
                mobileId,
                mobileData,
                { new: true }
            )
            res.status(200).json({
                message: "Cập nhập thành công",
                data: updateMobile
            });
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
    async deleteMobile(req, res) {
        try {
            const mobile = await Mobile.findByIdAndDelete(req.params.id);
            if (!mobile) {
                return res.status(404).json({
                    message: "Not Found",
                })
            }
            res.status(200).json({
                message: "Xóa thành công",
            });
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
}

export default MobileController;