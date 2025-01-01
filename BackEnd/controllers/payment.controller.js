const { Payment, User, Courses, Categories } = require('../models');

exports.createPayment = async (req, res) => {
  try {
    const { user_id, course_id, amount, payment_status } = req.body;

    // Validate input
    if (!user_id || !course_id || !amount) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const payment = await Payment.create({
      user_id,
      course_id,
      payment_date: new Date(),
      amount,
      payment_status: payment_status || 'Pending',
    });

    // Update user's purchased courses
    const user = await User.findByPk(user_id);
    if (user) {
      user.purchasedCourses = [...user.purchasedCourses, course_id];
      await user.save();
    }

    res.status(201).json({ message: 'Payment created successfully.', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the payment.', error: error.message });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const { user_id } = req.query;
    const payments = await Payment.findAll({
      where: { user_id },
      include: [
        {
          model: Courses,
          as: 'course',
          attributes: ['id', 'title', 'img', 'price'],
          include: [
            {
              model: Categories,
              as: 'category',
              attributes: ['name'],
            },
          ],
        },
      ],
    });
    res.status(200).json({ courses: payments.map(payment => payment.course) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching payments.', error: error.message });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found.' });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the payment.', error: error.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, course_id, amount, payment_status } = req.body;

    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found.' });
    }

    payment.user_id = user_id || payment.user_id;
    payment.course_id = course_id || payment.course_id;
    payment.amount = amount || payment.amount;
    payment.payment_status = payment_status || payment.payment_status;

    await payment.save();
    res.status(200).json({ message: 'Payment updated successfully.', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the payment.', error: error.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found.' });
    }

    await payment.destroy();
    res.status(200).json({ message: 'Payment deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the payment.', error: error.message });
  }
};