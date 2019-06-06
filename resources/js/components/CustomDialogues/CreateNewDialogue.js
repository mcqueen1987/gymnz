import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "-components/Grid/GridItem.jsx";
import GridContainer from "-components/Grid/GridContainer.jsx";
import CustomInput from "-components/CustomInput/CustomInput.jsx";
import Button from "-components/CustomButtons/Button.jsx";
import Card from "-components/Card/Card.jsx";
import CardHeader from "-components/Card/CardHeader.jsx";
import CardBody from "-components/Card/CardBody.jsx";
import CardFooter from "-components/Card/CardFooter.jsx";
import PropTypes from "prop-types";

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};

class CreateNewDialogue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        props.inputFields.forEach((field) => {
            this.state[field.name] = field.value || '';
        })
    }

    cancel = () => {
        this.props.onCancel()
    };

    save = () => {
        this.props.onSave({...this.state});
    };

    onChange = (field) => (e) => {
        let changed = {};
        changed[field] = e.currentTarget.value;
        this.setState(changed);
    };

    render() {
        const {classes} = this.props;
        return (<GridContainer alignItems="center" justify={"center"}>
            <GridItem xs={12} sm={12} md={8}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>{this.props.title}</h4>
                        <p className={classes.cardCategoryWhite}>Complete the profile</p>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            {this.props.inputFields.map((field) => {
                                return (
                                    <GridItem key={field.name} xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                                            id={field.name}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            error={
                                                this.state[field.name] ? !field.validation(this.state[field.name])
                                                    : undefined
                                            }
                                            success={
                                                this.state[field.name] ? field.validation(this.state[field.name])
                                                    : undefined
                                            }
                                            inputProps={{
                                                type: field.type || 'text',
                                                value: this.state[field.name],
                                                onChange: this.onChange(field.name),
                                                placeholder: field.placeholder || ''
                                            }}
                                        />
                                    </GridItem>
                                );
                            })}
                        </GridContainer>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.cancel}>Cancel</Button>
                        <Button
                            disabled={
                                !this.props.inputFields.reduce((preValue, curValue) => {
                                    return !!preValue && curValue.validation(this.state[curValue.name]);
                                }, true)
                            }
                            onClick={this.save}
                            color="primary"
                        >Save</Button>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>);
    }
}

CreateNewDialogue.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    inputFields: PropTypes.array,
    title: PropTypes.string,
};

export default withStyles(styles)(CreateNewDialogue);
