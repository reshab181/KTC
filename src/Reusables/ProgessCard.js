// Author: Ashutosh Rai
// Component: Booking Confirmation
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Svg, Line } from 'react-native-svg';

const ProgessCard = () => {
    const steps = [
        { label: 'Admin Approval', status: 'completed' },
        { label: 'Booking Confirmed', status: 'completed' },
        { label: 'Vehicle Assigned', status: 'pending' },
        { label: 'Journey Completed', status: 'pending' },
    ];
    return (
        <View style={styles.container}>
            {steps.map((step, index) => (
                <View key={index} style={styles.stepContainer}>
                    {/* Dot */}
                    <View
                        style={[
                            styles.dot,
                            step.status === 'completed' ? styles.completedDot : styles.pendingDot,
                        ]}
                    />
                    {index !== steps.length - 1 && (
                        <Svg height="40" width="2" style={styles.svgLine}>
                            <Line
                                x1="1"
                                y1="0"
                                x2="1"
                                y2="40"
                                stroke={step.status === 'completed' ? '#00C0A3' : '#C4C4C4'}
                                strokeWidth="2"
                                strokeDasharray="4, 4"
                            />
                        </Svg>
                    )}
                    <Text style={styles.label}>{step.label}</Text>
                </View>
            ))}
        </View>
    )
}

export default ProgessCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: 16,
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 4,
        elevation: 2,
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        height: 36,
        marginTop: 10,
        marginRight: 10,
    },
    dot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: 10,
        marginTop: -7,
    },
    completedDot: {
        backgroundColor: '#19BC9C', // Green color for completed
    },
    pendingDot: {
        backgroundColor: 'transparent', // Transparent for hollow
        borderWidth: 3,
        borderColor: '#C4C4C4',
    },
    svgLine: {
        position: 'absolute',
        left: 7, // Centered to align with the dot
        top: 18,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        borderBottomColor: '#F1F1F3',
        borderBottomWidth: 1,
        width: '95%',
        marginHorizontal: 10,
        paddingBottom: 9,
    },
})